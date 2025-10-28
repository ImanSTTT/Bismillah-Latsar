import { format } from "date-fns";
export const fmtDate = (d?: Date | null) => (d ? format(d, "yyyy-MM-dd") : "-");
