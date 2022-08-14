import { ApiResponse } from "@ordiri/client-typescript";
import { useEffect, useState } from "react";

interface KubeWatchData<TWatchedObj> {
  loading: boolean;
  items: Record<string, TWatchedObj>;
  error: string
}

// Streams data out of a chunked-encoding response body and yields objects as they are decoded
export default function useWatch<TWatchedObj>(request: () => Promise<ApiResponse<TWatchedObj>>): KubeWatchData<TWatchedObj> {
  const [watchData, setWatchData] = useState<KubeWatchData<TWatchedObj>>({
    loading: false,
    items: {},
    error: "",
  });

  useEffect(() => {
    // debugger;
    async function loadData() {
      try {
        setWatchData((d) => ({ ...d, loading: true }))
        request().then(async (response: ApiResponse<TWatchedObj>) => {
          for await (let line of makeReaderIterator(response.raw.body!.getReader())) {
            const obj: { type: "ADDED" | "MODIFIED" | "DELETED", object: any } = JSON.parse(line)
            if (obj.type === 'ADDED' || obj.type === 'MODIFIED') {
              setWatchData((data) => {
                return { ...data, items: { ...data.items, [obj.object.metadata.uid]: obj.object } }
              })
            } else if (obj.type === "DELETED") {
              setWatchData((data) => {
                delete (data.items[obj.object.metadata.uid])
                return { ...data }
              })
            } else {
              debugger;
            }
          }
        }).catch(e => console.error(e))
      } catch (e) {
        setWatchData((d) => ({ ...d, error: JSON.stringify(e) }))
        console.warn(e)
      } finally {
        setWatchData((d) => ({ ...d, loading: false }))
      }
    }
    loadData()
  }, [request]);

  return watchData;
}




export async function* makeReaderIterator(reader: ReadableStreamDefaultReader<Uint8Array>) {
  const utf8Decoder = new TextDecoder('utf-8');
  let { value: chunk, done: readerDone } = await reader.read();
  var decodedChunk = chunk ? utf8Decoder.decode(chunk) : '';

  const re = /\n|\r|\r\n/gm;
  let startIndex = 0;
  let result;

  for (; ;) {
    let result = re.exec(decodedChunk);
    if (!result) {
      if (readerDone) {
        debugger
        break;
      }
      let remainder = decodedChunk.substr(startIndex);
      ({ value: chunk, done: readerDone } = await reader.read());
      decodedChunk = remainder + (decodedChunk ? utf8Decoder.decode(chunk) : '');
      startIndex = re.lastIndex = 0;
      continue;
    }
    yield decodedChunk.substring(startIndex, result.index);
    startIndex = re.lastIndex;
  }
  if (startIndex < decodedChunk.length) {
    // last line didn't end in a newline char
    yield decodedChunk.substr(startIndex);
  }
}