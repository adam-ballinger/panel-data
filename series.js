class Series {
  constructor(data, options = {}) {
    this._data = this._initializeData(data);  // Efficiently store the data
    this._index = options.index || this._createDefaultIndex(data.length); // Create or assign index
    this.name = options.name || null; // Name of the series
    this.dtype = this._inferDtype(data); // Infer data type for better memory handling
  }
  
  // Initialize data efficiently (typed arrays for numeric data)
  _initializeData(data) {
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
  _createDefaultIndex(length) {
    return Array.from({ length }, (_, i) => i); // Default index [0, 1, 2, ...]
  }
  
  // Infer the dtype (similar to pandas)
  _inferDtype(data) {
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
      
    return 'mixed'; // Fallback for mixed types
  }
      
  
  // Method to get data at specific index
  at(index) {
    const idx = this._index.indexOf(index);
    return idx !== -1 ? this._data[idx] : undefined;
  }
  
  // Method to return the sum (for numeric types)
  sum() {
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
  
  // Add more methods like mean, min, max, etc.
  mean() {
    if (this.dtype === 'int32' || this.dtype === 'float64') {
      return this.sum() / this._data.length;
    }
    throw new Error('Mean is only available for numeric types');
  }
  
  // Convert Series to JSON (for exporting)
  toJSON() {
    return {
      data: Array.from(this._data), // Convert to regular array
      index: this._index,
      name: this.name,
      dtype: this.dtype
    };
  }
  
  // Other utility methods...
}
  

  
module.exports = Series;