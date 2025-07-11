import { sample } from "effector";
import { createBrowserHistory } from "history";
import { appStarted } from "shared/config";
import { router } from "../lib/routing";

sample({
	clock: appStarted,
	fn: () => createBrowserHistory(),
	target: router.setHistory,
});
