import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { addOrUpdateToCart, getCart, removeFromCart } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';

const useCart = () => {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();
  // useQuery(['carts', uid || ''] means carts에 uid별로 관리한다는 것이다. uid가 ''라는 뜻은 로그인하지 않은 상태
  // 그래서 enabled: !!uid은 uid가 로그인 했을 때 즉, 존재할떄만 이 query를 실행한다.
  const cartQuery = useQuery(['carts', uid || ''], () => getCart(uid), {
    enabled: !!uid,
  });

  const addOrUpdateItem = useMutation(
    (product) => addOrUpdateToCart(uid, product),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['carts', uid]); // 모든 cart를 invalidate하는게 아니라 해당 uid 만 하도록
      },
    }
  );

  const removeItem = useMutation((id) => removeFromCart(uid, id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['carts', uid]);
    },
  });

  return { cartQuery, addOrUpdateItem, removeItem };
};

export default useCart;
