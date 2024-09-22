// PanelData.test.js
const PanelData = require('../panel-data.js');
const Series = require('../series.js');
const testData = require('../sample-data/supply-chain-test-data.js');

const arrayOfSeries = [
  new Series([7, 6, 8, 7], {name:'Observations', index:[1, 2, 3, 4]}),
  new Series(['Monday', 'Tuesday', 'Wednesday', 'Thursday'], {name:'Day', index:[1, 2, 3, 4]}),
  new Series([true, true, false, true], {name:'Conditions Met', index:[1, 2, 3, 4]}),
  new Series([3.1, 9.6, 8.9, 12.5], {name:'Average Observation', index:[1, 2, 3, 4]})
];

describe('PanelData Class', () => {
  
  describe('Initialize Data', () => {

    test('Should initialize from an array of Series objects with no options', () => {
      const panelData = new PanelData(arrayOfSeries);
      expect(panelData.columns).toStrictEqual(['Observations', 'Day', 'Conditions Met', 'Average Observation']);
      expect(panelData.index).toStrictEqual([1, 2, 3, 4]);
      expect(panelData._data['Observations']._data).toStrictEqual(new Int32Array([7, 6, 8, 7]));
      expect(panelData.shape).toStrictEqual([4, 4]);
      expect(panelData.dtypes._data).toStrictEqual(['int32', 'object', 'boolean', 'float64']);
    });

    test('Should initialize from an array of Series objects with custom index and column names', () => {
      const panelData = new PanelData(arrayOfSeries, {index: [1, 2, 4], columns: ['a', 'b', 'c', 'd']});
      expect(panelData.columns).toStrictEqual(['a', 'b', 'c', 'd']);
      expect(panelData.index).toStrictEqual([1, 2, 4]);
      expect(panelData._data['a']._data).toStrictEqual(new Int32Array([7, 6, 7]));
      expect(panelData.shape).toStrictEqual([3, 4]);
      expect(panelData.dtypes._data).toStrictEqual(['int32', 'object', 'boolean', 'float64']);
    });

    test('Should initialize from an object of arrays with no options', () => {
      const panelData = new PanelData(testData.openOrders);
      expect(panelData.toJSON).toEqual(testData.openOrders);
    })
  })

  describe('countNonNull Method', () => {

    test('Should count non-null values in each series.', () => {
      const panelData = new PanelData(testData.itemAttributes);
      const countNonNull = panelData.countNonNull;
      console.log(countNonNull);
      expect(panelData.countNonNull.constructor.name).toBe('Series');
      expect(panelData.countNonNull.values).toEqual(new Int32Array([30, 26, 24, 22, 25, 23, 24]));
    })

  })

  describe('info Getter', () => {

    test('Should return a concise summary of the PanelData', () => {
      const panelData = new PanelData(testData.openOrders);
      const expectedInfo = {
        columns: panelData.columns,
        index: panelData.index,
        dtypes: panelData.dtypes,
        shape: panelData.shape,
        count_non_null: panelData.countNonNull,
      };

      expect(panelData.info).toEqual(expectedInfo);
    });

  });

  describe('toJSON Getter', () => {

    test('Should return data values in regular arrays', () => {
      const panelData = new PanelData(testData.openOrders);
      expect(panelData.toJSON).toEqual(testData.openOrders);
    });

  });

})