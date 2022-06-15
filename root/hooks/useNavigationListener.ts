import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

type NavigationListener = {
    onBeforeRemove?: () => void
    onBlur?: () => void
    onFocus?: () => void
}

const useNavigationListener = (listener: NavigationListener, deps: React.DependencyList = []) => {
    const navigation = useNavigation();
    const { onBeforeRemove, onBlur, onFocus } = listener;
    useEffect(() => {
        const navigationBeforeRemoveListener = navigation.addListener("beforeRemove", () => {
            onBeforeRemove?.();
        });
        const navigationBlurListener = navigation.addListener("blur", () => {
            onBlur?.();
        });
        const navigationFocusListener = navigation.addListener("focus", () => {
            onFocus?.();
        });
        return () => {
            navigationBeforeRemoveListener();
            navigationBlurListener();
            navigationFocusListener();
        }
    }, deps);

}

export default useNavigationListener;
