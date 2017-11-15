import Mock from 'mockjs'

Mock.mock('http://sunhaojie.com.test/api/v1/post', 'post', {
  'status': 200,
  'errorCode': 'SUCCESS',
  'message': '操作成功',
  'timestamp': '2017-10-17 12:12:12',
  'path': '/api/v1/post',
  'method': null,
  'requestId': null,
  'resultData': null,
  'subErrors': null
})

Mock.mock('http://http://10.3.30.149:9091/cust/list', 'post', {
  'status': 200,
  'errorCode': 'SUCCESS',
  'message': '操作成功',
  'timestamp': '2017-10-17 12:12:12',
  'path': '/cust/list',
  'method': null,
  'requestId': null,
  'resultData': {
    'pageData': {
      page_num: 1,
      total: 100,
      page_size: 10
    },
    'dataList':
    [
      {
        cst_type: 'person',
        cst_name: '王小明',
        gender: '',
        mobil_phones: '',
        // city: '朝阳区',
        // zip: 100000
      },
      {
        name: '张小刚',
        age: 25,
        address: '北京市海淀区西二旗',
        province: '北京市',
        city: '海淀区',
        zip: 100000
      },
      {
        name: '李小红',
        age: 30,
        address: '上海市浦东新区世纪大道',
        province: '上海市',
        city: '浦东新区',
        zip: 100000
      },
      {
        name: '周小伟',
        age: 26,
        address: '深圳市南山区深南大道',
        province: '广东',
        city: '南山区',
        zip: 100000
      },
      {
        name: '王小明',
        age: 18,
        address: '北京市朝阳区芍药居',
        province: '北京市',
        city: '朝阳区',
        zip: 100000
      },
      {
        name: '张小刚',
        age: 25,
        address: '北京市海淀区西二旗',
        province: '北京市',
        city: '海淀区',
        zip: 100000
      },
      {
        name: '李小红',
        age: 30,
        address: '上海市浦东新区世纪大道',
        province: '上海市',
        city: '浦东新区',
        zip: 100000
      },
      {
        name: '周小伟',
        age: 26,
        address: '深圳市南山区深南大道',
        province: '广东',
        city: '南山区',
        zip: 100000
      }
    ],
    'customerList':
    [
        {
            cusId: 1,
            uname: '王小明',
            sex: '男',
            mobile: '1380013800',
            customerType: '个人客户',
            cardId: '身份证',
            cardNum: '44010219xxxxxx4010'
          },
          {
            cusId: 2,
            uname: '李小红',
            sex: '女',
            mobile: '1380013800',
            customerType: '个人客户',
            cardId: '身份证',
            cardNum: '44010219xxxxxx4010'
          },
          {
            cusId: 3,
            uname: '王小明',
            sex: '男',
            mobile: '1380013800',
            customerType: '个人客户',
            cardId: '身份证',
            cardNum: '44010219xxxxxx4010'
          },
          {
            cusId: 4,
            uname: '李小红',
            sex: '女',
            mobile: '1380013800',
            customerType: '个人客户',
            cardId: '身份证',
            cardNum: '44010219xxxxxx4010'
          },
          {
            cusId: 5,
            uname: '王小明',
            sex: '男',
            mobile: '1380013800',
            customerType: '个人客户',
            cardId: '身份证',
            cardNum: '44010219xxxxxx4010'
          },
          {
            cusId: 6,
            uname: '李小红',
            sex: '女',
            mobile: '1380013800',
            customerType: '个人客户',
            cardId: '身份证',
            cardNum: '44010219xxxxxx4010'
          },
          {
            cusId: 7,
            uname: '王小明',
            sex: '男',
            mobile: '1380013800',
            customerType: '个人客户',
            cardId: '身份证',
            cardNum: '44010219xxxxxx4010'
          },
          {
            cusId: 8,
            uname: '李小红',
            sex: '女',
            mobile: '1380013800',
            customerType: '个人客户',
            cardId: '身份证',
            cardNum: '44010219xxxxxx4010'
          }
    ]
  },
  'subErrors': null
})
Mock.mock('http://dami.ksyun.com.test/api/v1/edit', 'post', {
  'status': 200,
  'errorCode': 'SUCCESS',
  'message': '操作成功',
  'timestamp': '2017-10-17 12:12:12',
  'path': '/api/post',
  'method': null,
  'requestId': null,
  'resultData': null,
  'subErrors': null
})
Mock.mock('http://dami.ksyun.com.test/api/v1/delete', 'post', {
  'status': 200,
  'errorCode': 'SUCCESS',
  'message': '操作成功',
  'timestamp': '2017-10-17 12:12:12',
  'path': '/api/post',
  'method': null,
  'requestId': null,
  'resultData': null,
  'subErrors': null
})