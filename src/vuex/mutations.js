import store from 'store'
export const MEMBER = 'member'

export const state = {
  auth: null,
  member: null,
  token: null,
  my_status:null,
  isStopClick:true, //声明是否能点击调用接口
  mallListLight:false,
  guoziIcon:'<svg aria-hidden="true" class="my-guozi"><use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-guozi"></use></svg>',
  roomData: {
    listArray: [],
    bannerList: [],
    roomDetailHashMap: {},
  },
  rankData: {
    weekList: [],
    monthList: [],
    totalList: [],
  },
  orderInfo:[],
};

export const mutations = {
  set(state, {key, val}) {
    state[key] = val
  },
  updateRoomInfo (state, data) {
    if (data) {
      var findIndex = state.roomData.listArray.findIndex(item =>
        item.roomID == data.roomID
      );
      if (findIndex) {
        state.roomData.listArray[findIndex] = data
      }
      store.set('roomList',state.roomData.listArray);
    }
  },
  putRoomInfo(state, {key, val}) {
    state.roomData[key] = val
  },
  putRankInfo(state, {key, val}) {
    state.rankData[key] = val
  },
  putRoomDetail (state, data) {
    state.roomData.roomDetailHashMap[data.roomID] = data
  },
  scrollTop(state, scrollTop) {
    state.scrollTop = scrollTop
  },
  logout(state) {
    state.member = {}
    localStorage.removeItem(MEMBER)
  }
};
