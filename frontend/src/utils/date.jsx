export const formatPostDate = (createdAt) => {
    const currentDate = new Date();
    const createdAtDate = new Date(createdAt);
  
    const timeDifferenceInSeconds = Math.floor((currentDate - createdAtDate) / 1000);
    const timeDifferenceInMinutes = Math.floor(timeDifferenceInSeconds / 60);
    const timeDifferenceInHours = Math.floor(timeDifferenceInMinutes / 60);
    const timeDifferenceInDays = Math.floor(timeDifferenceInHours / 24);
  
    if (timeDifferenceInDays > 1) {
      // If more than one day, display date in "Month Day" format
      return createdAtDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    } else if (timeDifferenceInDays === 1) {
      return "1 day ago";
    } else if (timeDifferenceInHours >= 1) {
      return `${timeDifferenceInHours} ${timeDifferenceInHours === 1 ? "hour" : "hours"} ago`;
    } else if (timeDifferenceInMinutes >= 1) {
      return `${timeDifferenceInMinutes} ${timeDifferenceInMinutes === 1 ? "minute" : "minutes"} ago`;
    } else if (timeDifferenceInSeconds >= 1) {
      return `${timeDifferenceInSeconds} ${timeDifferenceInSeconds === 1 ? "second" : "seconds"} ago`;
    } else {
      return "Just now";
    }
  };
  
  export const formatMemberSinceDate = (createdAt) => {
    const date = new Date(createdAt);
    const options = { day: "numeric", month: "long", year: "numeric" }; // Full date format
    const formattedDate = date.toLocaleDateString("en-US", options);
    return `Joined ${formattedDate}`;
  };
  