// Series.test.js
const Series = require('../series');
const testData = require('../sample-data/supply-chain-test-data')

describe('Series Class', () => {
  
  describe('Initialization', () => {
    
    test('should initialize with numeric data and Int32Array dtype', () => {
      const series = new Series([1, 2, 3, 4]);
      expect(series._data).toBeInstanceOf(Int32Array);
      expect(series._data.length).toBe(4);
      expect(series.dtype).toBe('int32');
    });

    test('should initialize with floating point data and Float64Array dtype', () => {
      const series = new Series([1.1, 2.2, 3.3]);
      expect(series._data).toBeInstanceOf(Float64Array);
      expect(series._data.length).toBe(3);
      expect(series.dtype).toBe('float64');
    });

    test('should initialize with mixed or object data', () => {
      const series = new Series(['a', 'b', 'c']);
      expect(series._data).toBeInstanceOf(Array);
      expect(series._data.length).toBe(3);
      expect(series.dtype).toBe('object');
    });

    test('should set index if provided', () => {
      const series = new Series([10, 20, 30], { index: ['a', 'b', 'c'] });
      expect(series._index).toEqual(['a', 'b', 'c']);
    });

    test('should generate default index if none is provided', () => {
      const series = new Series([10, 20, 30]);
      expect(series._index).toEqual([0, 1, 2]);
    });

    test('should set name property if provided', () => {
      const series = new Series([10, 20, 30], { name: 'Sample'});
      expect(series.name).toBe('Sample');
    });

    test('should throw an error for non-array data', () => {
      expect(() => new Series(123)).toThrow('Data must be an array or typed array');
    });

  });

  describe('Data Access', () => {
    
    test('should return value at specific index with at()', () => {
      const series = new Series([10, 20, 30], { index: ['a', 'b', 'c'] });
      expect(series.at('b')).toBe(20);
    });

    test('should return undefined for invalid index with at()', () => {
      const series = new Series([10, 20, 30], { index: ['a', 'b', 'c'] });
      expect(series.at('d')).toBeUndefined();
    });

  });

  describe('Sum Method', () => {
    
    test('should correctly sum numeric data', () => {
      const series = new Series([1, 2, 3, 4]);
      expect(series.sum).toBe(10);
    });

    test('should throw an error when summing non-numeric data', () => {
      const series = new Series(['a', 'b', 'c']);
      expect(() => series.sum).toThrow('Sum is only available for numeric types');
    });

  });

  describe('Mean Method', () => {
    
    test('should correctly calculate the mean of numeric data', () => {
      const series = new Series([1, 2, 3, 4]);
      expect(series.mean).toBe(2.5);
    });

    test('should throw an error when calculating mean for non-numeric data', () => {
      const series = new Series(['a', 'b', 'c']);
      expect(() => series.mean).toThrow('Mean is only available for numeric types');
    });

  });

  describe('Filter Method', () => {
    
    test('should filter data based on a callback', () => {
      const series = new Series([10, 20, 30, 40], { index: ['a', 'b', 'c', 'd'] });
      const filteredSeries = series.filter(value => value > 20);
      expect(filteredSeries._data).toEqual(new Int32Array([30, 40]));
      expect(filteredSeries._index).toEqual(['c', 'd']);
    });

    test('should return an empty Series if no values pass the filter', () => {
      const series = new Series([10, 20, 30, 40], { index: ['a', 'b', 'c', 'd'] });
      const filteredSeries = series.filter(value => value > 50);
      expect(filteredSeries._data).toEqual(new Int32Array([]));
      expect(filteredSeries._index).toEqual([]);
    });

  });

  describe('Dtype Inference', () => {
    
    test('should infer int32 dtype for integer data', () => {
      const series = new Series([1, 2, 3]);
      expect(series.dtype).toBe('int32');
    });

    test('should infer float64 dtype for float data', () => {
      const series = new Series([1.1, 2.2, 3.3]);
      expect(series.dtype).toBe('float64');
    });

    test('should infer object dtype for non-numeric data', () => {
      const series = new Series(['a', 'b', 'c']);
      expect(series.dtype).toBe('object');
    });

    test('should infer mixed dtype for mixed data types', () => {
      const series = new Series([1, 'a', true]);
      expect(series.dtype).toBe('mixed');
    });

  });

  describe('toJSON Method', () => {
    
    test('should serialize the Series to a JSON object', () => {
      const series = new Series([10, 20, 30], { index: ['a', 'b', 'c'], name: 'Test' });
      const json = series.toJSON;
      expect(json).toEqual({
        data: [10, 20, 30],
        index: ['a', 'b', 'c'],
        name: 'Test',
        dtype: 'int32'
      });
    });

  });

  describe('countNonNull Method', () => {

    test('should count the number of non-null values', () => {
      const series = new Series([1, 2, null, NaN, undefined]);
      expect(series.countNonNull).toBe(2);
    })
  })

  describe('toArray Method', () => {
    
    test('should convert a series back to a regular Array', () => {
      const series = new Series(testData.openOrders.productID);
      expect(series.toArray).toEqual(testData.openOrders.productID);
    })

  })

});
