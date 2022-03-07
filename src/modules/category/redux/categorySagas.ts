import { call, put, select } from "redux-saga/effects";
import { API_PATHS } from "../../../configs/api";
import { AppState } from "../../../redux/reducer";
import { getErrorMessageResponse } from "../../../utils";
import { CustomFetch } from "../../common/utils";
import { getErrorToastAction, getSuccessToastAction } from "../../toast/utils";
import { setCategoryList } from "./categoryReducer";

export function* fetchCategoryList(): any {
    const categories = yield select((state: AppState) => state.category.list)
    if (categories.length) {
        return
    }
    try {
        const response = yield call(CustomFetch, API_PATHS.getCategoryList)
        if (response.errors) {
            yield put(getErrorToastAction(getErrorMessageResponse(response) as string))
            return;
        }
        yield put(setCategoryList(response.data))
        yield put(getSuccessToastAction("Categories fetch success"))

    } catch (error: any) {
        yield put(getErrorToastAction())
    }
}
