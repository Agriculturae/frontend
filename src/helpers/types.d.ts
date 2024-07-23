interface NavList {
  title: string;
  path: string;
}

interface UserModel {
  id: string;
  name: string;
  surname: string;
  email: string;
  type: string;
  active: boolean;
  uuid: string;
  farmId: number | null;
  businessId: number | null;
}

interface LoginPayloadUserModel {
  user: UserModel | null;
  farm: FarmModel | null;
  business: BusinessModel | null;
  accessToken: string | null;
  refreshToken: string | null;
  error: string | null;
}

interface FarmModel {
  id: number;
  uuid: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  province: string;
  city: string;
  address: string;
  zip: string;
  lat: number;
  lng: number;
  userIds: number[];
}

interface BusinessModel {
  id: number;
  uuid: string;
  name: string;
  email: string;
  website: string;
  phone: string;
  country: string;
  province: string;
  city: string;
  address: string;
  zip: string;
  lat: number;
  lng: number;
  userIds: number[];
}

interface CategoryModel {
  id: number;
  name: string;
}

interface SubCategoryModel {
  id: number;
  name: string;
  categoryId: number;
}

interface ProductTypeModel {
  id: number;
  name: string;
  subcategoryId: number;
}

interface CreateListingModel {
  title: string;
  description: string;
  product: SubCategoryModel | null;
  productType: ProductTypeModel | null;
  productionDate: string;
  quantity: number;
  price: number;
  farmId: number;
  packaging: boolean;
  deliveryOption: boolean;
  termsAndConditions: boolean;
  qualityControl: boolean;
}
