import { CALENDAR_ROUTE, SETTINGS_ROUTE, FOLDERS_ROUTE } from "../../variables/variables";

import Calendar from "../calendar/Calendar";
import Settings from "../settings/Settings";
import Folders from "../folders/Folders";

export const publicRoutes = [
    {
        path: CALENDAR_ROUTE,
        Component: Calendar,
    },
    {
        path: SETTINGS_ROUTE,
        Component: Settings,
    },
    {
        path: FOLDERS_ROUTE,
        Component: Folders,
    },
]