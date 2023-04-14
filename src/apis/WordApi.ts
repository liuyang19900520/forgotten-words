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
    [APIMethods.LIST]: {path: '/words', errMsg: '单词列表请求失败'},
    [APIMethods.POST]: {path: '/words', errMsg: '单词添加失败'},
    [APIMethods.GET]: {path: '/words/:id', errMsg: '单词请求失败'},
    [APIMethods.DELETE]: {path: '/words/:id', errMsg: '单词删除失败'},
  },
}

export default {
  ...mdlBaseApi.initApi<IWord, Pick<BaseAPIType.IMethods<IWord>, APIMethods.GET | APIMethods.LIST | APIMethods.DELETE>>(initBaseAPIParams),
}

