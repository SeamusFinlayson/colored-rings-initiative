import { useCallback, useEffect, useEffectEvent, useState } from "react";
import type { Metadata } from "@owlbear-rodeo/sdk";
import OBR from "@owlbear-rodeo/sdk";
import { parseMetadata } from "./parseMetadata";

/**
 *
 * @param key object key where data is saved
 * @param parser function that returns data with type validation
 * @returns an array containing the current value saved at the key and a function that sets the react state and the value Room metadata and a boolean indicating if data has been received
 */
export function useRoomMetadata<T>(
  key: string,
  parser: (value: unknown) => T,
  fallback: T,
) {
  const [metadata, setMetadata] = useState<T>(fallback);

  const updateMetadata = useCallback(
    (newValue: T) => {
      setMetadata(newValue);
      OBR.room.setMetadata({
        [key]: newValue,
      });
    },
    [key],
  );

  const handleRoomMetadata = useEffectEvent((metadata: Metadata) =>
    setMetadata(parseMetadata(metadata, key, parser, fallback)),
  );

  useEffect(() => {
    OBR.room.getMetadata().then(handleRoomMetadata, () => {});
    return OBR.room.onMetadataChange(handleRoomMetadata);
  }, []);

  return { value: metadata, update: updateMetadata };
}
