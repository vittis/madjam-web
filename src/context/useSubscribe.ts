import { useEffect } from "react";
import { RoomCallback, useWsClient } from "./socketContext";

const useSubscribe = (room: string, callback: RoomCallback) => {
  const { subscribe, clientState } = useWsClient();

  useEffect(() => {
    if (clientState !== "connected") {
      return;
    }
    subscribe(room, callback);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientState]);
};

export default useSubscribe;
