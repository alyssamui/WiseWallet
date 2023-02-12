import * as dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

const dayjsConfig = dayjs;
export const DATETIME_FORMAT = "M/D/YYYY";

dayjsConfig.extend(customParseFormat);

export default dayjsConfig;
