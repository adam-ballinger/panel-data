const openOrders = {
  productID: [
    'P001', 'P002', 'P003', 'P004', 'P005', 'P006', 'P007', 'P008', 'P009', 'P010', 
    'P011', 'P012', 'P013', 'P014', 'P015', 'P016', 'P017', 'P018', 'P019', 'P020', 
    'P021', 'P022', 'P023', 'P024', 'P025', 'P026', 'P027', 'P028', 'P029', 'P030'
  ],
  supplierName: [
    'Supplier A', 'Supplier B', 'Supplier C', 'Supplier A', 'Supplier D', 'Supplier E', 
    'Supplier F', 'Supplier G', 'Supplier B', 'Supplier C', 'Supplier D', 'Supplier E', 
    'Supplier A', 'Supplier F', 'Supplier B', 'Supplier C', 'Supplier G', 'Supplier A', 
    'Supplier E', 'Supplier F', 'Supplier G', 'Supplier D', 'Supplier C', 'Supplier B', 
    'Supplier A', 'Supplier E', 'Supplier F', 'Supplier G', 'Supplier B', 'Supplier D'
  ],
  orderDate: [
    '2024-09-01', '2024-09-03', '2024-09-05', '2024-09-07', '2024-09-09', '2024-09-10',
    '2024-09-11', '2024-09-12', '2024-09-13', '2024-09-14', '2024-09-15', '2024-09-16',
    '2024-09-17', '2024-09-18', '2024-09-19', '2024-09-20', '2024-09-21', '2024-09-22',
    '2024-09-23', '2024-09-24', '2024-09-25', '2024-09-26', '2024-09-27', '2024-09-28',
    '2024-09-29', '2024-09-30', '2024-10-01', '2024-10-02', '2024-10-03', '2024-10-04'
  ],
  leadTimeDays: [
    14, 7, 21, 10, 5, 12, 18, 8, 14, 25, 20, 10, 15, 9, 6, 7, 13, 17, 22, 11, 
    6, 16, 23, 12, 9, 14, 18, 20, 7, 5
  ],
  quantityOrdered: [
    100, 200, 150, 300, 50, 400, 250, 350, 220, 180, 140, 270, 390, 330, 280, 210, 
    310, 290, 130, 500, 440, 160, 310, 190, 240, 410, 370, 140, 260, 230
  ],
  unitCost: [
    25.5, 40.0, 30.0, 35.75, 22.5, 50.0, 45.0, 27.5, 33.0, 29.75, 32.5, 36.0, 41.25, 
    26.5, 23.75, 28.0, 31.5, 34.25, 25.0, 39.0, 44.5, 37.0, 24.0, 21.75, 30.25, 29.5, 
    33.75, 35.5, 38.0, 42.25
  ],
  shippingMethod: [
    'Air', 'Sea', 'Truck', 'Sea', 'Air', 'Truck', 'Air', 'Sea', 'Truck', 'Air', 
    'Truck', 'Sea', 'Air', 'Truck', 'Sea', 'Truck', 'Air', 'Sea', 'Truck', 'Air', 
    'Sea', 'Truck', 'Air', 'Truck', 'Air', 'Sea', 'Truck', 'Air', 'Sea', 'Truck'
  ],
  status: [
    'Pending', 'Shipped', 'Pending', 'Delivered', 'Delivered', 'Shipped', 'Pending', 
    'Delivered', 'Pending', 'Shipped', 'Pending', 'Delivered', 'Pending', 'Delivered', 
    'Pending', 'Shipped', 'Delivered', 'Pending', 'Shipped', 'Delivered', 'Pending', 
    'Shipped', 'Pending', 'Delivered', 'Pending', 'Shipped', 'Pending', 'Delivered', 
    'Pending', 'Shipped'
  ]
};


const itemAttributes = {
  productID: [
    'P001', 'P002', 'P003', 'P004', 'P005', 'P006', 'P007', 'P008', 'P009', 'P010', 
    'P011', 'P012', 'P013', 'P014', 'P015', 'P016', 'P017', 'P018', 'P019', 'P020', 
    'P021', 'P022', 'P023', 'P024', 'P025', 'P026', 'P027', 'P028', 'P029', 'P030'
  ],
  productName: [
    'Widget A', 'Gadget B', 'Tool C', 'Gizmo D', 'Device E', 'Apparatus F', 'Instrument G', 'Machine H', 'Contraption I', null, 
    'Widget J', 'Gadget K', 'Tool L', null, 'Device M', 'Apparatus N', 'Instrument O', 'Machine P', 'Contraption Q', 'Widget R', 
    'Gadget S', null, 'Tool T', 'Gizmo U', 'Device V', 'Apparatus W', 'Instrument X', 'Machine Y', null, 'Widget Z'
  ],
  weightLbs: [
    12.5, 15.0, 8.2, null, 10.3, 20.0, 7.5, 25.3, null, 14.7, 
    18.0, null, 16.5, 9.0, 19.2, 11.7, 12.0, null, 8.0, 14.5, 
    21.3, 13.0, null, 17.8, 12.7, 23.5, 15.5, 9.8, null, 19.0
  ],
  dimensionsIn: [
    '30x20x10', '40x25x15', null, '50x30x20', '20x10x5', '45x30x15', null, '55x40x20', '60x35x25', '35x25x15', 
    null, '50x25x15', '30x20x10', '40x20x15', null, '50x35x20', '60x40x30', '25x20x10', '35x25x15', null, 
    '55x35x25', '40x30x20', '45x25x15', null, '35x20x10', '55x30x20', null, '30x15x10', '45x30x15', null
  ],
  category: [
    'Electronics', 'Hardware', 'Tools', null, 'Appliances', 'Furniture', 'Instruments', 'Machinery', 'Tools', 'Hardware', 
    'Electronics', null, 'Tools', 'Electronics', 'Appliances', 'Furniture', null, 'Machinery', 'Instruments', 'Tools', 
    'Electronics', 'Hardware', null, 'Appliances', 'Furniture', 'Tools', null, 'Machinery', 'Appliances', 'Electronics'
  ],
  stockAvailable: [
    true, false, true, true, null, false, true, null, true, true, 
    false, null, true, true, true, false, null, true, true, false, 
    null, true, false, true, false, null, true, true, true, null
  ],
  supplierRating: [
    4.5, 3.8, null, 4.2, 4.0, 3.5, null, 4.7, 4.1, 3.9, 
    null, 4.3, 4.8, 4.6, 3.7, null, 4.0, 4.2, 4.9, 3.8, 
    4.6, 3.5, null, 4.4, 4.7, 3.9, null, 4.1, 4.3, 3.6
  ]
};

module.exports = {
  openOrders,
  itemAttributes
}