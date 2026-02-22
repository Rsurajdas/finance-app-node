import {unpack, pack} from "msgpackr"

const serialize = (data) => pack(data)

const deserialize = (data) => unpack(data)

export { serialize, deserialize }