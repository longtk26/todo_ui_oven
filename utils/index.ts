import _, { NumericDictionary } from "lodash";

const changeDatetoDateTimeLocal = (date?: string) => {
    if (!date) {
        return "";
    }
    const dateSevenHoursAhead = changeDateToSevenHoursAhead(date);
    const arr = dateSevenHoursAhead.split("T");
    return `${arr[0]}T${arr[1].slice(0, 5)}`;
};

const changeDatetoShowOnUI = (date?: string) => {
    if (!date) {
        return "";
    }
    const dateSevenHoursAhead = changeDateToSevenHoursAhead(date);
    return dateSevenHoursAhead.replace("T", " ").slice(0, 16);
};

const changeDateToSevenHoursAhead = (date?: string) => {
    if (!date) {
        return "";
    }
    const utcTime = new Date(date).getTime();
    const offSet = 7 * 60; // 7 hours
    const localTime = utcTime + offSet * 60000;
    return new Date(localTime).toISOString();
};

const getUpdateData = <T extends Record<string, string | undefined>>(
    newData: T,
    oldData: T
): NumericDictionary<T[string] | undefined> => {
    const result: Partial<T> = {};
    for (const key in newData) {
        if (newData[key] === oldData[key]) {
            continue;
        }

        result[key] = newData[key];
    }

    return _.omitBy(result, _.isNil);
};

export { changeDatetoDateTimeLocal, changeDatetoShowOnUI, getUpdateData };
