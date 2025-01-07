import React, { FC, useEffect, useState } from "react";
import axios from "axios";

type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl, title }) => {
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });

  useEffect(() => {
    axios
      // When you push the code and deploy in guthub use this url and then push
      // https://kai-e-learning-management-backend.onrender.com/api/v1/getVdoCipherOTP
      .post("https://kai-e-learning-management-backend.onrender.com/api/v1/getVdoCipherOTP", {
        videoId: videoUrl,
      })
      .then((res) => {
        setVideoData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching video data:", err);
      });
  }, [videoUrl]);

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4 text-gray-800">{title}</h1>
      <div className="flex flex-col items-center justify-center p-1 bg-gray-100 rounded-lg shadow-md">
        <div
          style={{
            paddingTop: "56.25%", // 16:9 aspect ratio
            position: "relative",
            width: "100%",
            maxWidth: "900px",
          }}
          className="rounded-lg overflow-hidden"
        >
          {videoData.otp && videoData.playbackInfo !== "" ? (
            <iframe
              src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData.playbackInfo}&player=6UqKsC8JxqFe7hGN`}
              style={{
                border: 0,
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
              }}
              allowFullScreen={true}
              allow="encrypted-media"
              className="rounded-lg"
            ></iframe>
          ) : (
            <div className="flex items-center justify-center h-full absolute top-0 left-0 w-full">
              <p className="text-gray-500">Loading video...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;
