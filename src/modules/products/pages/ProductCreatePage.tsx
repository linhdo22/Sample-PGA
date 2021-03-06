import moment from 'moment';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { API_PATHS } from '../../../configs/api';
import { ROUTES } from '../../../configs/routes';
import { IParamsProduct } from '../../../models/product';
import BackButton from '../../common/components/button/BackButton';
import Button from '../../common/components/button/Button';
import ToolBar from '../../common/components/ToolBar';
import useScrollToTop from '../../common/hooks/useScrollToTop';
import { CustomFetchFormData } from '../../common/utils';
import { getErrorToastAction } from '../../toast/utils';
import FormProductComponent from '../components/FormProductComponent';
import { getProductDetailValues } from '../redux/productSagas';
import { detectImageChange, UploadImageProduct } from '../utils';

const ProductCreatePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { containerRef } = useScrollToTop();

  const defaultProductCreateInfo: IParamsProduct = useMemo(
    () => ({
      vendor_id: '',
      name: '',
      brand_id: '',
      condition_id: '',
      categories: [],
      description: '',
      enabled: '1',
      memberships: [],
      shipping_to_zones: [
        {
          id: '1',
          price: '0.00',
        },
      ],
      tax_exempt: '0',
      price: '0',
      sale_price_type: '$',
      arrival_date: new Date(),
      inventory_tracking: 0,
      quantity: '',
      sku: Date.now() + '',
      participate_sale: 0,
      sale_price: '0',
      og_tags_type: '0',
      og_tags: '',
      meta_desc_type: 'A',
      meta_description: '',
      meta_keywords: '',
      product_page_title: '',
      facebook_marketing_enabled: '0',
      google_feed_enabled: '0',
      imagesInfo: [],
      deleted_images: [],
    }),
    [],
  );
  const [submitable, setSubmitable] = useState(false);
  const [submitFlag, setSubmitFlag] = useState(false);

  useEffect(() => {
    dispatch(getProductDetailValues.request());
  }, [dispatch]);

  const handleSetSubmitable = useCallback((changeTo: boolean) => {
    setSubmitable(changeTo);
  }, []);

  const handleCreateProduct = useCallback(
    async (productInfo: IParamsProduct) => {
      productInfo.arrival_date = moment(productInfo.arrival_date).format('YYYY-MM-DD');
      const { imagesOrder, newImages } = detectImageChange(productInfo);
      productInfo.imagesOrder = imagesOrder;
      delete productInfo.imagesInfo;
      const createForm = new FormData();
      createForm.append('productDetail', JSON.stringify(productInfo));
      const response = await CustomFetchFormData(API_PATHS.createProduct, 'post', createForm);
      if (response.errors || !response.data) {
        dispatch(getErrorToastAction(response.errors || 'Something wrong'));
        return;
      }

      // upload image
      const productId = response.data;
      const uploadProcess: Promise<any>[] = [];
      newImages.forEach((info) => {
        uploadProcess.push(UploadImageProduct(productId, info.order + '', info.url!));
      });
      try {
        await Promise.all(uploadProcess);
        history.push(ROUTES.detailProduct + '/' + productId);
      } catch (error: any) {
        if (typeof error == 'string') dispatch(getErrorToastAction(error));
      }
    },
    [dispatch, history],
  );

  const handleSubmitForm = useCallback(
    (productInfo: IParamsProduct) => {
      setSubmitFlag(false);
      handleCreateProduct(productInfo);
    },
    [handleCreateProduct],
  );

  return (
    <div ref={containerRef} className="space-y-4 pt-10  text-white">
      <div className="mx-10">
        <BackButton onClick={() => history.goBack()} />
      </div>
      <div className="mx-10 text-3xl font-semibold">Add Product</div>
      <FormProductComponent
        productInfo={defaultProductCreateInfo}
        submitFlag={submitFlag}
        onSubmit={handleSubmitForm}
        onSubmitable={handleSetSubmitable}
      />
      <div className="sticky bottom-0 px-10">
        <ToolBar>
          <Button disabled={!submitable} variant="yellow" onClick={() => setSubmitFlag(true)}>
            Create account
          </Button>
        </ToolBar>
      </div>
    </div>
  );
};

export default ProductCreatePage;
