import {
	createContext,
	type Dispatch,
	type FC,
	type ReactNode,
	type SetStateAction,
	useEffect,
	useLayoutEffect,
	useMemo,
	useState,
} from 'react';
import theme from 'tailwindcss/defaultTheme';
import useDeviceScreen from '../hooks/useDeviceScreen';
// import themeConfig from '@/config/theme.config';

export interface IThemeContextProps {
	sidebarStatus: boolean;
	setSidebarStatus: Dispatch<SetStateAction<boolean>>;
}
const ThemeContext = createContext<IThemeContextProps>({} as IThemeContextProps);

interface IThemeContextProviderProps {
	children: ReactNode;
}
export const ThemeContextProvider: FC<IThemeContextProviderProps> = ({ children }) => {
		/**
	 * Aside Status
	 */
	const { width } = useDeviceScreen();
	const [sidebarStatus, setSidebarStatus] = useState(
		localStorage.getItem('ld_sidebarStatus')
			? localStorage.getItem('ld_sidebarStatus') === 'true'
			: true,
	);
	useLayoutEffect(() => {
		if (Number(theme.screens.md.replace('rem', '')) * 16 <= Number(width))
			localStorage.setItem('ld_sidebarStatus', sidebarStatus?.toString());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sidebarStatus]);
	useEffect(() => {
		if (Number(theme.screens.md.replace('rem', '')) * 16 > Number(width)) setSidebarStatus(false);
		return () => {
			setSidebarStatus(
				localStorage.getItem('ld_sidebarStatus')
					? localStorage.getItem('ld_sidebarStatus') === 'true'
					: true,
			);
		};
	}, [width]);


	const values: IThemeContextProps = useMemo(
		() => ({
			sidebarStatus,
			setSidebarStatus,
		}),
		[sidebarStatus],
	);

	return <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>;
};

export default ThemeContext;
