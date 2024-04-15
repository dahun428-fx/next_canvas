import { PoliceResourceYears, searchPoliceList } from "@/api/clients/services/open/police";
import { Dispatch } from "redux";
import { actions } from "./slice";
import { SearchPoliceReseponse } from "@/models/api/open/police/SearchPoliceResponse";

export function loadOperations(dispatch: Dispatch) {
  return async () => {
    const page = 1;
    const perPage = 250;
    const promise = Promise.all(
      PoliceResourceYears.map(async (item) => {
        const year = item;
        const response = await searchPoliceList({ page, perPage, year: year });
        return response;
      })
    );
    promise.then(async (response: SearchPoliceReseponse[]) => {
      const violenceItems = response.map((item: SearchPoliceReseponse, index) => {
        return {
          ...item,
          year: `${item.data[0].발생년도}`,
        };
      });
      dispatch(actions.load(violenceItems));
    });
  };
}
