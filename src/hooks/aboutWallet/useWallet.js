import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {
    actions
} from "../../redux/modules/wallet";
import {getWallet} from "../../redux/modules/entities/wallet";
import {getWalletStatus} from "../../redux/modules/wallet";


const useASEditor = () => {
    const dispatch = useDispatch();

    const walletDispatcher = bindActionCreators(
        actions,
        dispatch
    );

    return {
        walletConfigurator:  async () => await walletDispatcher.walletConfigurator(),
        walletSetter: async (wallet) => await walletDispatcher.setWallet(wallet),
        walletDisconnetor: async () => await walletDispatcher.disconnectWallet(),
        walletGetter: useSelector(state => getWallet(state)),
        walletStatusGetter: useSelector(state => getWalletStatus(state))
    }
}

export default useASEditor;