import styled from '@emotion/styled';

import facepaint from 'facepaint';

import KakaoShareBtn from '../kakao/KakaoShareBtn';

const mq = facepaint([
  '@media (min-width: 1024px)',
  '@media (min-width: 1440px)',
])

const MapTop = styled.div(() => mq({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: '1rem',
  color: '#828282',
  padding: '0 1rem',
  paddingTop: '1rem',
  paddingBottom: '0.25rem',
  '& h4': {
    fontWeight: '700',
  },
}));

const ShareContainer = styled.div(() => mq({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& span': {
    marginRight: '0.5rem',
  },
}));

const Map = styled.div({
  width: '100%',
  height: '40vh',
})

export default function RestaurantsMap() {
  return (
    <>
      <MapTop>
        <h4>위치(지도)</h4>
        <ShareContainer>
          <span>데이트 상대에게 페이지를 공유해볼까요?</span>
          <KakaoShareBtn />
        </ShareContainer>
      </MapTop>
      <Map id='map'></Map>
    </>
  )
}