import { getMenuData, getOrederRequest } from '../../utils/dataConvert';

describe('data utils', () => {
  it('should convert server initial data', () => {
    const serverData = {
      category: {
        title: 'catTitle',
        items: {
          item: {
            title: 'itemTitle',
            price: 1,
            dayAvailable: 1,
          },
        },
      },
    };
    const expectedData = {
      menuData: [
        {
          id: 'category',
          title: 'catTitle',
          items: [
            {
              id: 'item',
              title: 'itemTitle',
              price: 1,
              dayAvailable: 1,
            },
          ],
        },
      ],
    };
    expect(getMenuData(serverData)).toEqual(expectedData);
  });
  it('should convert to a server request', () => {
    const orderData = [
      {
        categoryId: 'category',
        itemId: 'item',
        count: 1,
      },
    ];
    const expectedRequest = {
      category: {
        item: 1,
      },
    };
    expect(getOrederRequest(orderData)).toEqual(expectedRequest);
  });
});
