import { memo, useCallback } from 'react';
import BasketTotal from '../../components/basket-total';
import ItemBasket from '../../components/item-basket';
import List from '../../components/list';
import ModalLayout from '../../components/modal-layout';
import { useIntl } from '../../context/intl-context';
import useSelector from '../../store/use-selector';
import useStore from '../../store/use-store';

function Basket() {
  const store = useStore();
  const { t } = useIntl();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  };

  const renders = {
    itemBasket: useCallback(
      item => {
        return (
          <ItemBasket
            item={item}
            onRemove={callbacks.removeFromBasket}
            onCloseModal={callbacks.closeModal}
          />
        );
      },
      [callbacks.removeFromBasket, callbacks.closeModal],
    ),
  };

  return (
    <ModalLayout
      title={t('Cart')}
      onClose={callbacks.closeModal}
    >
      <List
        list={select.list}
        renderItem={renders.itemBasket}
      />
      <BasketTotal sum={select.sum} />
    </ModalLayout>
  );
}

export default memo(Basket);
