import React from "react";
import CharAvatar from "../cards/CharAvatar";
import moment from "moment";

const PollOptionVoteResult = ({ label, optionVotes, totalVotes }) => {
  // Calculate progress directly
  const progress =
    totalVotes > 0 ? Math.round((optionVotes / totalVotes) * 100) : 0;

  return (
    <div className="w-full bg-slate-200/80 rounded-md h-6 relative mb-3">
      <div
        className="bg-sky-900/10 h-6 rounded-md"
        style={{ width: `${progress}%` }}
      ></div>
      <span className="absolute inset-0 flex items-center justify-between text-gray-800 text-[12px] font-medium mx-4">
        {label} <span className="text-[11px] text-slate-500">{progress}%</span>
      </span>
    </div>
  );
};

const ImagePollResult = ({ imgUrl, optionVotes, totalVotes }) => {
  return (
    <div>
      <div className="w-full bg-gray-800 flex items-center gap-2 mb-4 rounded-md overflow-hidden">
        <img src={imgUrl} alt="" className="w-full h-36 object-contain" />
      </div>

      <PollOptionVoteResult optionVotes={optionVotes} totalVotes={totalVotes} />
    </div>
  );
};

const OpenEndedPollResponse = ({
  profileImgUrl,
  userFullName,
  response,
  createdAt,
}) => {
  return (
    <div className="mb-8 ml-3">
      <div className="flex gap-3">
        {profileImgUrl ? (
          <img src={profileImgUrl} alt="" className="w-8 h-8 rounded-full" />
        ) : (
          <CharAvatar
            fullName={userFullName}
            style="w-8 h-8 text-[10px] bg-sky-800/40"
          />
        )}

        <p className="text-[13px] text-black">
          {userFullName}{" "}
          <span className="mx-1 text-[10px] text-slate-500">.</span>
          <span className="text-[10px] text-slate-500"> {createdAt}</span>
        </p>
      </div>

      <p className="text-xs text-slate-700 -mt-5 ml-[60px]">{response}</p>
    </div>
  );
};

const PollingResultContent = ({ type, options, voters, responses }) => {
  switch (type) {
    case "single-choice":
    case "yes/no":
    case "rating":
      return (
        <>
          {options.map((option, index) => (
            <PollOptionVoteResult
              key={option._id}
              label={`${option.optionText} ${type === "rating" ? "Star" : ""}`}
              optionVotes={option.votes}
              totalVotes={voters || 0}
            />
          ))}
        </>
      );

    case "image-based":
      return (
        <div className="grid grid-cols-2 gap-4">
          {options.map((option, index) => (
            <ImagePollResult
              key={option._id}
              imgUrl={option.optionText || ""}
              optionVotes={option.votes}
              totalVotes={voters || 0}
            />
          ))}
        </div>
      );

    case "open-ended":
      return responses.map((response) => {
        return (
          <OpenEndedPollResponse
            key={response._id}
            profileImgUrl={response.voterId?.profileImgUrl}
            userFullName={response.voterId?.fullName || ""}
            response={response.responseText || ""}
            createdAt={
              response.createdAt ? moment(response.createdAt).fromNow() : ""
            }
          />
        );
      });
    default:
      return null;
  }

  return <div>PollingResultContent</div>;
};

export default PollingResultContent;
