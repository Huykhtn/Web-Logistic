import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Carousel } from "antd";
import styled from "styled-components";
import { MainContext } from "../../context/MainContext";
import axios from "axios";
import { END_POINT } from "../../utils/constant";
import { Fade, Zoom } from "react-reveal";

const CarouselWrapper = styled(Carousel)`
  > ul {
    margin-top: 0px;
  }

  > .slick-dots {
    bottom: 60px;
  }

  > .slick-dots li button {
    width: 11px;
    height: 11px;
    border-radius: 100%;
  }
  > .slick-dots li.slick-active button {
    width: 11px;
    height: 11px;
    border-radius: 100%;
    background: #fc8080;
  }
`;
export default function ServiceDetail({ serviceTitle, serviceSubtitle }) {
  const { pathname } = useLocation();
  const { setMetadata } = useContext(MainContext);
  const [quotes, setQuotes] = useState([])
  const [services, setServices] = useState({})
  const [features, setFeatures] = useState([])
  const [participants, setParticipants] = useState([])


  const [id, SetId] = useState("")
  useEffect(() => {
    setMetadata((prev) => {
      return {
        ...prev,
        title: `${serviceTitle} | TKTL`,
      };
    });

  }, [pathname]);
  useEffect(() => {
    try {
      const getId = async () => {
        const res = await axios.get(`${END_POINT}/service`)
        res.data.data.service.map(service => {
          if (service.sub_detail == serviceSubtitle) {
            SetId(service._id)
          }
        })
      }
      getId()
      if (id) {
        const getservice = async () => {
          const res = await axios.get(`${END_POINT}/service/${id}`)
          console.log(res)
          const { data } = res.data
          setServices(data)
        }
        getservice()
        const getquote = async () => {
          const res = await axios.get(`${END_POINT}/quote/service/${id}`)

          const { data } = res.data
          setQuotes(data)
        }
        getquote()
        const getfeature = async () => {
          const res = await axios.get(`${END_POINT}/feature/service/${id}`)

          const { data } = res.data
          setFeatures(data.feature)
        }
        getfeature()
        const getparticipant = async () => {
          const res = await axios.get(`${END_POINT}/participant/service/${id}`)

          const { data } = res.data
          setParticipants(data)
        }
        getparticipant()
      }
    }
    catch (err) {
      console.log(err)
    }
  }, [id, pathname])

  console.log("service", services)
  return (
    <section id="layout-content">
      <div className="h-full lg:h-[610px] w-full relative pt-12 ">
        <img
          className="lg:absolute lg:left-1/2 lg:top-10 w-full h-full lg:w-auto object-cover right-negative-margin"
          src={`${END_POINT}/public/${services?.banner}`}
          alt="banner dich vu"
        />
        <div className="container mx-auto h-full flex items-center">
          <div className="w-full h-auto lg:w-[540px] relative">
            <img
              src="https://jtexpress.vn/themes/jtexpress/assets/images/Map-world.png"
              className="w-full h-full object-cover hidden lg:block "
              alt=""
            />
            <div className="lg:absolute left-[50%] lg:top-[50%] lg:translate-x-[-50%] lg:translate-y-[-50%] lg:w-full lg:h-full lg:py-6 px-4 lg:px-0">
              <h5
                className="mt-6 lg:mt-0 text-[#f5c736] font-bold text-[24px] lg:text-[36px] aos-init"
                data-aos="fade-right"
              >
                {services?.name}
              </h5>
              <span className="block my-6 lg:my-4 text-justify lg:text-left lg:text-[18px]">
                {services?.target}
              </span>
              <Link to="/tu-van/dang-ki-tu-van">
                <button className="flex lg:inline-flex justify-center items-center bg-[#e5a663] rounded-[2px] text-white w-full lg:w-[215px]  h-[56px] mt-8 lg:mt-4">
                  <img
                    src="https://jtexpress.vn/themes/jtexpress/assets/images/icon-detail-sevice.png"
                    alt=""
                  />
                  <span className="ml-2 font-bold text-[18px]">Đăng ký tư vấn</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto lg:pt-[80px] lg:pb-[58px]">
        <div className="wrapper_description_service px-4 grid lg:px-0 md:grid-cols-1 sm:grid-cols-1  lg:grid-cols-[700px_minmax(400px,_1fr)_200px] gap-[100px]  ">
          <div className="wrapper_description_service_detail mt-16 lg:mt-0 grid lg:grid-cols-2 gap-[30px] md:grid-cols-1 sm:grid-cols-1">
            {
              features.map(feature =>
              (
                <div className="flex item-start" key={feature._id}>
                  <img
                    className="w-[48px] h-[48px] object-cover"
                    src={`${END_POINT}/public/${feature?.logo}`}
                    alt=""
                  />

                  <div className="flex flex-col ml-4">
                    <h5 className="mb-2 text-[#f5c736] text-[20px] font-bold">
                      {feature?.name}
                    </h5>
                    <Fade left duration={1000}>
                      <span className="text-justify aos-init">
                        {feature?.detail}
                      </span>
                    </Fade>
                  </div>
                </div>
              )
              )
            }

            {features.length < 4 && <div className="w-2/3 h-2/3">
              <img
                className="w-auto h-auto object-cover hidden lg:block"
                src={`${END_POINT}/public/${services?.logo}`}
                alt=""
              />
            </div>}
          </div>
          <img
            src="https://jtexpress.vn/themes/jtexpress/assets/images/car-service-detail.png"
            className="w-full h-full object-cover rounded-[10px]"
            alt=""
          />
        </div>
      </div>
      <div className="lg:bg-[#F4F4F4] lg:pt-[38px] lg:pb-[58px]">
        <div className="container mx-auto mt-10 lg:mt-0 px-4 lg:px-0 mb-10 lg:mb-0 ">
          <Fade left duration={1000}>
            <h5
              className=" font-extrabold text-3xl md:text-4xl text-[#161D25] text-center aos-init" /*  */
              data-aos="fade-right"
            >
              Đối tượng phù hợp
            </h5>
          </Fade>
          <Zoom>
            <span
              className="block text-center mt-5 mb-4 w-full lg:w-[578px] text-base mx-auto aos-init" /*  */
              data-aos="zoom-in"
            >
              {services.tip}
            </span>
          </Zoom>
          <div className="w-[27px] h-[3px] bg-[#f5c736] mx-auto mb-8"></div>
          <div className={participants.length % 3 == 0 ? "wrapper_objects_service grid grid-cols-3 gap-[20px]"
            : "wrapper_objects_service grid grid-cols-2 gap-[20px]"} >
            {
              participants.map(participant => (
                <div className={participants.length % 3 == 0 ? "h-[350px] lg:h-[375px] relative rounded-[10px] overflow-hidden col-span-3 md:col-span-1"
                  : "h-[350px] lg:h-[375px] relative rounded-[10px] overflow-hidden col-span-2 md:col-span-1"}>
                  <img
                    src={`${END_POINT}/public/${participant?.banner}`}
                    class="w-full h-full object-cover"
                    alt=""
                  />
                  <div class="object-service-detail absolute top-[60%] translate-y-[-60%] left-[10%] text-white w-[222px] lg:w-[320px]">
                    <span class="block Montserrat-Bold mb-3 text-[24px] font-bold">
                      {participant?.name}
                    </span>
                    <Fade duration={1000}>
                      <span
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        class="aos-init text-[16px]"
                      >
                        {participant?.description}
                      </span>
                    </Fade>
                  </div>
                </div>
              )
              )
            }
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center mt-7 gap-x-[24px] gap-y-[12px]">
            <div className="block w-full lg:w-[215px] md:w-[735px] h-[56px] border border-[#fbd535]">
              <Link to="/tra-cuu/bang-gia">
                <button className="flex items-center text-[#f5c736] font-bold justify-center h-full w-full">
                  <ion-icon
                    name="search-outline"
                    role="img"
                    className="md hydrated"
                    aria-label="search outline"
                  />
                  <span className="ml-2  font-bold text-lg">Bảng giá</span>
                </button>
              </Link>
            </div>
            <span className="block w-full lg:w-[215px] md:w-[735px] sm:w-[610px] h-[56px] border border-[#fbd535]">
              <Link to="/tu-van/dang-ki-tu-van">
                <button className="flex items-center text-[#f5c736] font-bold justify-center h-full w-full">
                  <ion-icon
                    name="search-outline"
                    role="img"
                    className="md hydrated"
                    aria-label="search outline"
                  />
                  <span className="ml-2  font-bold text-lg">
                    Đăng ký tư vấn
                  </span>
                </button>
              </Link>
            </span>
            <span className="block w-full lg:w-[215px] md:w-[735px] h-[56px] border border-[#f5c736]">
              <Link to="/tra-cuu/buu-cuc">
                <button className="flex items-center text-[#f5c736] font-bold justify-center h-full w-full">
                  <ion-icon
                    name="search-outline"
                    role="img"
                    className="md hydrated"
                    aria-label="search outline"
                  />
                  <span className="ml-2  font-bold text-lg">
                    Bưu cục gần nhất
                  </span>
                </button>
              </Link>
            </span>
          </div>
        </div>
      </div>
      <div className="">
        <CarouselWrapper
          effect="fade"
          dots="true"
          autoplay
          autoplaySpeed={3500}
        >
          {
            quotes.map(quote => (

              <div className="relative" key={quote?._id}>
                <img
                  src="https://jtexpress.vn/themes/jtexpress/assets/images/slider-tuyen-dung.png"
                  className="w-full h-[380px] md:h-[500px] object-cover"
                  alt="pic"
                />
                <div className="absolute top-0 left-0 ">
                  <div className="flex items-center justify-center flex-col  mt-[60px] md:mt-[100px] ">
                    <img
                      src={`${END_POINT}/public/${quote?.avatar}`}
                      alt=""
                      className="rounded-[50%]  w-[68px] h-[68px] preventselect"
                    ></img>
                    <div className="mx-8 sm:mx-[70px] md:mx-[130px] lg:mx-[320px] mt-[16px]">
                      <div className="text-white font-semibold text-lg text-center sm:text-xl md:text-2xl preventselect">
                        "{quote?.quote}"
                      </div>
                    </div>
                    <h1 className="text-white font-bold text-lg mt-[14px] preventselect">
                      {quote?.name}
                    </h1>
                    <div className="text-white text-base sm:text-[16px] preventselect">
                      {quote?.description}
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </CarouselWrapper>
      </div>
      <div className="h-[490px] lg:h-[765px] relative">
        <img
          className="w-full h-full object-cover"
          src="https://jtexpress.vn/themes/jtexpress/assets/images/service-detail-bg.png"
          alt=""
        />
        <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full lg:w-[825px]">
          <h5 className="text-center text-[#161D25] text-[24px] lg:text-[36px] font-bold mb-4 lg:mb-6 mt-8 lg:mt-0">
            Video giới thiệu dịch vụ
          </h5>
          <span
            className="block text-center mb-8 lg:mb-10 w-full lg:w-[600px] mx-auto px-4 lg:px-0 aos-init"
            data-aos="fade-up"
            data-aos-easing="ease-in-out"
          >
            J&amp;T Express là thương hiệu chuyển phát nhanh dựa trên sự phát
            triển của công nghệ và Internet. Chúng tôi sở hữu một mạng lưới rộng
            khắp nhằm hỗ trợ các hoạt động giao nhận hàng hóa nhanh chóng và
            tiện lợi.
          </span>
          <iframe
            className="w-full px-4 lg:px-0 lg:h-[425px] border-0 mb-8 md:h-[250px] sm:h-[250px]"
            src="https://www.youtube.com/embed/0zeoAeXgTHk?rel=0"
            title="YouTube video player"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
