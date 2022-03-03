const initialState = {
  restaurants: [], // JSON에서 받아온 최초의 데이터
  situationRestaurantsData: [], // 상황별로 솔팅해서 저장된 레스토랑
  restaurantsData: [], // situationRestaurantsData가 공란일 경우 restaurants로 저장

  categoryRestaurantsData: [], // 음식 종류별로 솔팅해서 저장된 레스토랑
  placeRestaurantsData: [], // 장소 종류별로 솔팅해서 저장된 레스토랑
  filteredRestaurantsData: [], // 정상적으로 솔팅된 레스토랑 저장

  sortNumber: '',
  color: '',

  selectedCategory: '',
  selectedPlace: '',
  categoryColor: '',
  placeColor: '',
  alter: '',

  // 지도 중심좌표 저장
  placePosition: {
    lat: 37.566826,
    lon: 126.9786567,
  },
  filteredPlaceResult: [],

  // 애프터코스 저장
  afterRestaurants: [],
  afterCafes: [],
  afterBars: [],
  recommendation: [],

  searchField: {},
  searchKeyword: '',
  moodRestaurantsData: {},
  randomSituationPlaceRestaurants: [],
  randomAgeCategoryRestaurants: [],
};

const reducers = {
  // SituationSelectPage: 레스토랑 JSON데이터 셋!
  setRestaurants(state, { payload: { restaurants } }) {
    return {
      ...state,
      restaurants,
    }
  },

  // CustomPage: 최초 레스토랑 혹은 상황별로 솔팅된 레스토랑으로 업데이트
  setRestaurantsData(state, { payload: { restaurantsData } }) {
    return {
      ...state,
      restaurantsData,
    }
  },

  // SituationSelecPage: 2. 상황별 솔팅 => 필터링된 레스토랑 셋!
  setSituationRestaurants(state, { payload: { situationRestaurantsData } }) {
    return {
      ...state,
      situationRestaurantsData,
    }
  },

  // SearchPage: 분위기별 솔팅 => 필터링된 레스토랑 셋!
  setMoodRestaurants(state, { payload: { moodName, moodRestaurantsData } }) {
    return {
      ...state,
      moodRestaurantsData: {
        ...state.moodRestaurantsData,
        [moodName]: moodRestaurantsData,
      },
    }
  },

  // RestaurantsPage: 검색결과 객체 셋
  setPlaceResultRestaurants(state, { payload: { filteredPlaceResult } }) {
    const { y, x } = filteredPlaceResult;

    return {
      ...state,
      filteredPlaceResult,
      placePosition: {
        lat: x,
        lon: y,
      },
    }
  },

  // RestaurantsAfterContainer
  setAfterRestaurants(state, { payload: { afterRestaurants } }) {
    return {
      ...state,
      afterRestaurants,
    }
  },
  setAfterCafes(state, { payload: { afterCafes } }) {
    return {
      ...state,
      afterCafes,
    }
  },
  setAfterBars(state, { payload: { afterBars } }) {
    return {
      ...state,
      afterBars,
    }
  },
  setRecommendCourse(state, { payload: { recommendation } }) {
    return {
      ...state,
      recommendation,
    }
  },

  // 검색결과 셋
  setSearchResultRestaurants(state, { payload: { searchKeyword, searchResultRestaurants } }) {
    return {
      ...state,
      searchResultRestaurants,
      searchKeyword,
      moodRestaurantsData: {},
    }
  },

  // 추천레스토랑 셋
  setRandomRecommendedRestaurants1(state, { payload: { filteredTwice, situation, place } }) {
    return {
      ...state,
      randomSituationPlaceRestaurants: [
        ...state.randomSituationPlaceRestaurants,
        ...filteredTwice,
      ],
      situation, place,
    }
  },

  setRandomRecommendedRestaurants2(state, { payload: { filteredTwice, age, category } }) {
    return {
      ...state,
      randomAgeCategoryRestaurants: [
        ...state.randomAgeCategoryRestaurants,
        ...filteredTwice,
      ],
      age, category,
    }
  },

  // SituationSelecPage: 1. 상황별 솔팅 => 숫자로 필터된 레스토랑으로 업데이트
  filterRestaurantsBySituation(state, { payload: { filteredRestaurantsBySituation, sortNumber } }) {
    const { situationRestaurantsData } = state;

    if (filteredRestaurantsBySituation.length == situationRestaurantsData.length) {
      return {
        ...state,
        situationRestaurantsData: [],
        sortNumber: '',
        color: '',
      }
    } else {
      return {
        ...state,
        situationRestaurantsData: filteredRestaurantsBySituation,
        sortNumber,
        color: 'select',
      }
    }
  },

  // 음식종류별 솔팅 => 장소 > 음식으로 필터된 레스토랑으로 업데이트
  filterRestaurantsByCategory(state, { payload: { filteredRestaurantsByCategory, categoryValue } }) {
    const {
      restaurantsData,
      categoryRestaurantsData, placeRestaurantsData,
      selectedCategory,
    } = state;

    if (
      selectedCategory === categoryValue && // 음식 똑같은거 중복선택
      filteredRestaurantsByCategory.length === categoryRestaurantsData.length
    ) {
      return {
        ...state,
        categoryRestaurantsData: [],
        filteredRestaurantsData: placeRestaurantsData,
        selectedCategory: categoryValue,
        categoryColor: '',
        alert: '',
      }
    } else if (
      selectedCategory !== categoryValue &&
      filteredRestaurantsByCategory.length === 0) { // 선택한게 빈배열일때
      return {
        ...state,
        categoryRestaurantsData: restaurantsData.filter(restaurant =>
          restaurant.category.includes(categoryValue)),
        filteredRestaurantsData: restaurantsData.filter(restaurant =>
          restaurant.category.includes(categoryValue)),
        placeRestaurantsData: [],
        selectedCategory: categoryValue,
        categoryColor: 'select',
        selectedPlace: '',
        alert: '가고 싶으신 곳을 다시 선택해주세요 !',
      }
    } else { // 위 해당사항이 없을때
      return {
        ...state,
        categoryRestaurantsData: filteredRestaurantsByCategory,
        filteredRestaurantsData: filteredRestaurantsByCategory,
        selectedCategory: categoryValue,
        categoryColor: 'select',
        alert: '',
      }
    }
  },

  // 장소종류별 솔팅 => 음식 > 장소로 필터된 레스토랑으로 업데이트
  filterRestaurantsByPlace(state, { payload: { filteredRestaurantsByPlace, placeValue } }) {
    const {
      restaurantsData,
      categoryRestaurantsData, placeRestaurantsData,
      selectedPlace,
    } = state;

    if (
      selectedPlace === placeValue && // 장소 똑같은거 중복선택
      filteredRestaurantsByPlace.length === placeRestaurantsData.length
    ) {
      return {
        ...state,
        placeRestaurantsData: [],
        filteredRestaurantsData: categoryRestaurantsData,
        selectedPlace: placeValue,
        placeColor: '',
        alert: '',
      }
    } else if (
      selectedPlace !== placeValue &&
      filteredRestaurantsByPlace.length === 0) { // 선택한게 빈배열일때
      return {
        ...state,
        placeRestaurantsData: restaurantsData.filter(restaurant =>
          restaurant.place.includes(placeValue)),
        filteredRestaurantsData: restaurantsData.filter(restaurant =>
          restaurant.place.includes(placeValue)),
        categoryRestaurantsData: [],
        selectedPlace: placeValue,
        placeColor: 'select',
        selectedCategory: '',
        alert: '드시고 싶은 것을 다시 선택해주세요 !',
      }
    } else { // 위 해당사항이 없을때
      return {
        ...state,
        placeRestaurantsData: filteredRestaurantsByPlace,
        filteredRestaurantsData: filteredRestaurantsByPlace,
        selectedPlace: placeValue,
        placeColor: 'select',
        alert: '',
      }
    }
  },

  changeSearchField(state, { payload: { name, value } }) {
    return {
      ...state,
      searchField: {
        ...state.searchField,
        [name]: value,
      },
    }
  },
}

function defaultReducer(state) {
  return state
}

export default function reducer(state = initialState, action) {
  return (reducers[action.type] || defaultReducer)(state, action);
}
