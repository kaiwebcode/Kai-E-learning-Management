import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type ReviewType = {
  user: { firstName: string; lastName: string };
  course: { courseName: string };
  review: string;
  rating: number;
};

type RatingStarsProps = {
  Review_Count: number;
};

const RatingStars = ({ Review_Count }: RatingStarsProps) => {
  return (
    <div className="flex items-center gap-1">
      {"⭐".repeat(Review_Count)}{" "}
      <span className="text-sm text-gray-500">
        ({Review_Count})
      </span>
    </div>
  );
};

const RatingSlider = () => {
  const [Reviews, setReviews] = useState<ReviewType[]>([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const getReviews = async () => {
      setLoading(true);
      try {
        // Mocking review data
        const fetchedReviews = Array.from({ length: 10 }, (_, index) => ({
          user: {
            firstName: `User${index + 1}`,
            lastName: `LastName${index + 1}`,
          },
          course: {
            courseName: `Course ${index + 1}`,
          },
          review: `This is a review from User${index + 1}. It provides insights about the course.`,
          rating: Math.floor(Math.random() * 5) + 1, // Random rating between 1 and 5
        }));

        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating API delay
        setReviews(fetchedReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    getReviews();
  }, []);

  return (
    <div className="w-full p-5">
      {Loading ? (
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <Skeleton count={5} height={150} />
        </SkeletonTheme>
      ) : (
        <Swiper
          modules={[Autoplay, Mousewheel, Keyboard]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          mousewheel={{
            enabled: true,
            forceToAxis: true,
          }}
          keyboard={{
            enabled: true,
            onlyInViewport: true,
          }}
          loop={true}
          slidesPerView={1}
          spaceBetween={20}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="mySwiper"
        >
          {Reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col gap-3 bg-gray-800 text-white p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <img
                    src={`https://randomuser.me/api/portraits/men/${index}.jpg`}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold">
                      {review.user.firstName} 
                    </h3>
                    <p className="text-sm text-gray-400">
                      {review.course.courseName}
                    </p>
                  </div>
                </div>
                <p className="text-gray-300">{review.review.slice(0, 100)}...</p>
                <RatingStars Review_Count={review.rating} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default RatingSlider;
