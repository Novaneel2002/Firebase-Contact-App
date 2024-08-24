import { useState } from "react";

const useDisclose = () => {
    const [isopen, setisopen] = useState(false);
  const onopen = () => {
    setisopen(true);
  }
  const onclose = () => {
    setisopen(false);
  }

  return {onclose, onopen, isopen}
}

export default useDisclose;