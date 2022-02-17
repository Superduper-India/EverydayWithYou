import styled from '@emotion/styled';

import {
  Link,
} from 'react-router-dom';

import '../../resources/js/bootstrap.bundle.min.js';

import HomeSituationTagsContainer from '../containers/home/HomeSituationTagsContainer';
import HomePlaceTagsContainer from '../containers/home/HomePlaceTagsContainer';
import HomeCategoryTagsContainer from '../containers/home/HomeCategoryTagsContainer';
import HomeRestaurantsContainer from '../containers/home/HomeRestaurantsContainer';

const HomePageLayout = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const TopCarouselBox = styled.div({
});

const BtmFormBox = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '36px 24px',
  '& div': {
    textAlign: 'left',
    '& h4': {
      marginBottom: '36px',
    },
  },
});

export default function HomePage({ restaurants }) {
  document.getElementById('myCarousel')
  return (
    <HomePageLayout>
      <TopCarouselBox id="myCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="active" aria-current="true"
            aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">

          <div className="carousel-item active">
            <img src='resources/img/pasta.jpg' />
            <div className="container">
              <div className="carousel-caption text-start">
                <Link to="/post"><h1>맛집 추천하기</h1></Link>
                <p>지금 당장 고고싱!</p>
              </div>
            </div>
          </div>

          <div className="carousel-item">
            <img src='https://mblogthumb-phinf.pstatic.net/MjAyMDA5MTFfNTAg/MDAxNTk5NzgzNTYzNjY0.f-PVbkC_So4KOCb1q_X1U-VbH1JVSGBDQcfPgugvraMg.1QPPwHBh0MvIVmGYSgWopxNLOqm5cGk0dtbVd7OZ9vMg.JPEG.daffodil1234/IMG_5663.JPG?type=w800' />
            <div className="container">
              <div className="carousel-caption">
                <h1>두번째 메뉴</h1>
                <p>블라블라블라</p>
              </div>
            </div>
          </div>

          <div className="carousel-item">
            <img src='https://mblogthumb-phinf.pstatic.net/MjAyMDA5MTFfNTAg/MDAxNTk5NzgzNTYzNjY0.f-PVbkC_So4KOCb1q_X1U-VbH1JVSGBDQcfPgugvraMg.1QPPwHBh0MvIVmGYSgWopxNLOqm5cGk0dtbVd7OZ9vMg.JPEG.daffodil1234/IMG_5663.JPG?type=w800' />
            <div className="container">
              <div className="carousel-caption text-end">
                <h1>세번째 메뉴</h1>
                <p>블라블라블라</p>
              </div>
            </div>
          </div>
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </TopCarouselBox>

      <BtmFormBox>
        <div>
          <h2>어디 갈지 모르겠다구요? 👀</h2>
          <h4>순서대로 원하시는 태그를 선택해주세요!</h4>
          <HomeSituationTagsContainer
            restaurantsData={restaurants}
          />
          <HomePlaceTagsContainer
            restaurantsData={restaurants}
          />
          <HomeCategoryTagsContainer
            restaurantsData={restaurants}
          />
        </div>
        <HomeRestaurantsContainer />
      </BtmFormBox>
    </HomePageLayout>
  )
}
