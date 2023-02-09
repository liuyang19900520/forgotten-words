import mdlBaseApi, {APIMethods} from './BaseApi'

export interface IWord {
  id: number;
  english?: string;
  japanese?: string;
  chinese?: string;
  type?: string;
  series?: string;
  episode?: string;
  favoriteStar?: number;
  deleteFlg?: string;
  createUser?: string;
  createTime?: Date;
  updateUser?: string;
  updateTime?: Date;
}

const initBaseAPIParams: BaseAPIType.IInitParams = {
  uri: {
    [APIMethods.LIST]: {path: '/words', errMsg: 'err.user.load'},
  },
}

export default {
  ...mdlBaseApi.initApi<IWord, Pick<BaseAPIType.IMethods<IWord>, APIMethods.GET | APIMethods.LIST | APIMethods.POST>>(initBaseAPIParams),
}

