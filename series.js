// Initialize data efficiently (typed arrays for numeric data)
function initializeData(data) {
  if (Array.isArray(data)) {
    if (data.every(Number.isInteger)) {
      return new Int32Array(data);
    }
    if (data.every(v => typeof v === 'number')) {
      return new Float64Array(data);
    }
    return data; // Fallback to standard array for mixed or object data
  }
  throw new Error('Data must be an array or typed array');
}

// Create a default index
function createDefaultIndex(length) {
  return Array.from({ length }, (_, i) => i); // Default index [0, 1, 2, ...]
}

// Infer the dtype
function inferDtype(data) {
  if (data instanceof Int32Array) {
    return 'int32';
  }
  if (data instanceof Float64Array) {
    return 'float64';
  }
      
  // Check if all elements are integers
  if (Array.isArray(data) && data.every(Number.isInteger)) {
    return 'int32';
  }
      
  // Check if all elements are numbers
  if (Array.isArray(data) && data.every(v => typeof v === 'number')) {
    return 'float64';
  }
      
  // Check if the data is a string array (object dtype)
  if (Array.isArray(data) && data.every(v => typeof v === 'string')) {
    return 'object';
  }

  // Check if the data is a boolean array
  if (Array.isArray(data) && data.every(v => typeof v === 'boolean')) {
    return 'boolean';
  }
    
  return 'mixed'; // Fallback for mixed types
}

class Series {
  constructor(data, options = {}) {
    this._data = initializeData(data);  
    this._index = options.index || createDefaultIndex(data.length); 
    this.name = options.name || null; 
    this.dtype = inferDtype(data); 
  }
  
  // Check if an object is a Series
  static isSeries(obj) {
    return obj && typeof obj === 'object' && obj.constructor.name === 'Series';
  }
  
  // Method to get the values of a Series
  get values() {
    return this._data;
  }

  // Method to get the values of a Series in an Array
  get toArray() {
    return Array.from(this._data);
  }

  // Method to get data at specific index
  at(index) {
    const idx = this._index.indexOf(index);
    return idx !== -1 ? this._data[idx] : undefined;
  }
  
  // Method to return the sum (for numeric types)
  get sum() {
    if (this.dtype === 'int32' || this.dtype === 'float64') {
      return this._data.reduce((acc, val) => acc + val, 0);
    }
    throw new Error('Sum is only available for numeric types');
  }
  
  // Method to filter the data
  filter(callback) {
    const filteredData = [];
    const filteredIndex = [];
    this._data.forEach((value, idx) => {
      if (callback(value, this._index[idx])) {
        filteredData.push(value);
        filteredIndex.push(this._index[idx]);
      }
    });
    return new Series(filteredData, { index: filteredIndex, name: this.name, dtype: this.dtype });
  }
  
  get mean() {
    if (this.dtype === 'int32' || this.dtype === 'float64') {
      return this.sum / this._data.length;
    }
    throw new Error('Mean is only available for numeric types');
  }
  
  // Convert Series to JSON (for exporting)
  get toJSON() {
    return {
      data: Array.from(this._data), // Convert to regular array
      index: this._index,
      name: this.name,
      dtype: this.dtype
    };
  }
  
  // Method to count non-null values
  get countNonNull() {
    return this._data.reduce((count, value) => {
      if (value !== null && value !== undefined && !Number.isNaN(value)) {
        count++;
      }
      return count;
    }, 0);
  }
  
}
  

  
module.exports = Series;