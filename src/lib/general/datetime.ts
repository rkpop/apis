import Moment from "moment";

const fromXAgo = (count: number, unit: string): Date => {
  let units: Moment.unitOfTime.DurationConstructor = unit as Moment.unitOfTime.DurationConstructor;
  return Moment()
    .subtract(count, units)
    .toDate();
};

export { fromXAgo };
