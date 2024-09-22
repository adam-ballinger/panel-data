const Series = require('./series');

// Function to determine the structure of given data
function determineDataStructure(data) {
    if (Array.isArray(data)) {
        if (data.length === 0) {
            return "Empty array";
        }
    
        // Check first element to determine the type
        const firstElement = data[0];
    
        if (Series.isSeries(firstElement)) {
            // Check if all elements are Series objects
            if (data.every(Series.isSeries)) {
                return "Array of Series objects";
            }
        }
    
        if (Array.isArray(firstElement)) {
            // Check if all elements are arrays
            if (data.every(Array.isArray)) {
                return "Array of arrays";
            }
        }
    
        if (typeof firstElement === 'object' && !Array.isArray(firstElement)) {
            // Check if all elements are plain objects
            if (data.every(item => typeof item === 'object' && !Array.isArray(item))) {
                return "Array of objects";
            }
        }
    }

    if (typeof data === 'object') {
        if (Object.keys(data).length === 0) {
            return 'Empty object';
        }

        // Check the first value of the object to determine type
        const firstValue = Object.values(data)[0];

        if (Array.isArray(firstValue)) {
            // Check if all values are arrays
            if (Object.values(data).every(Array.isArray)) {
              return "Object of arrays";
            }
        }

        if (Series.isSeries(firstValue)) {
            // Check if all values are Series objects
            if (Object.values(data).every(Series.isSeries)) {
              return "Object of Series objects";
            }
        }

        // Helper functoin to determine if a value is an object and not an array
        function isObject(value) {
            return typeof value === 'object' && !Array.isArray(value);
          }
        
        if (isObject(firstValue)) {
            // Check if all values are objects (and not arrays)
            if (Object.values(data).every(isObject)) {
              return "Object of objects";
            }
        }        
    }

    return "Unsupported data structure";
}
  

class PanelData {
    constructor(data, options = {}) {

        const dataStructure = determineDataStructure(data);
        this._data = {};
        this.columns = [];
        const dtypes = [];

        switch (dataStructure) {
            case "Array of Series objects":
                // If the input is already an array of Series objects, convert to an object of Series
                
                const allIndices = options.index || [...new Set(data.flatMap(series => series._index))].sort();

                // For each Series, align its data with the union of indices
                data.forEach((series, index) => {
                    const alignedData = allIndices.map(i => {
                        const idx = series._index.indexOf(i);
                        return idx !== -1 ? series._data[idx] : null; // Use null for missing data
                    });
                    const column = ((options.columns || [])[index] || series.name || `Series_${index}`);
                    this.columns.push(column);
                    this._data[column] = new Series(alignedData, { index: allIndices, name: column });
                    dtypes.push(this._data[column].dtype);
                });
            
                this.index = allIndices;  // Store the aligned index
                break;
              
                case "Object of arrays":
                    // Construct PanelData from an object where each value is an array (columns)
                    this.index = options.index || [...Array(Object.values(data)[0].length).keys()]; // default index if not provided
            
                    Object.keys(data).forEach((key) => {
                        const columnData = data[key];
                        this._data[key] = new Series(columnData, { index: this.index, name: key });
                        this.columns.push(key);
                        dtypes.push(this._data[key].dtype);
                    });
                    break;
              
            default:
              throw new Error("Unsupported data structure");
        } 
        
        this.shape = [this.index.length, this.columns.length];
        this.dtypes = new Series(dtypes, {name: 'dtypes', index:this.columns});

    }

    // Counts the values that are not null, NaN, or undefined in each series and returns a series with thier values
    get countNonNull() {
        const counts = [];
        this.columns.forEach((column) => {
            counts.push(this._data[column].countNonNull);
        })

        return new Series(counts, {name: 'count_non_null', index: this.columns});
    }

    // Gets a concise summary of PanelData
    get info() {
        return {
            columns: this.columns,
            index: this.index,
            dtypes: this.dtypes,
            shape: this.shape,
            count_non_null: this.countNonNull
        };
    }

    // Method to get the data values in regular Arrays
    get toJSON() {
        const result = {}
        this.columns.forEach((column) => {
            result[column] = this._data[column].toArray;
        })
        return result;
    }
}

module.exports = PanelData;