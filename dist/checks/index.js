// import
// check accessibility
import { checkImageAlt } from "./accessibility/checkImageAlt.js";
import { checkButtons } from "./accessibility/checkButtons.js";
import { checkFormLabels } from "./accessibility/checkFormLabels.js";
import { checkTouchTargets } from "./accessibility/checkTouchTargets.js";
import { checkIframesHaveTitle } from "./accessibility/checkIframesHaveTitle.js";
// check media
import { checkImageFormats } from "./media/checkImageFormats.js";
import { checkLazyLoading } from "./media/checkLazyLoading.js";
// check meta
import { checkMetaDescription } from "./meta/checkMetaDescription.js";
import { checkCanonical } from "./meta/checkCanonical.js";
import { checkOpenGraph } from "./meta/checkOpenGraph.js";
import { checkMetaAuthorGenerator } from "./meta/checkMetaAuthorGenerator.js";
import { checkMetaRobots } from "./meta/checkMetaRobots.js";
// check links
import { checkAnchorTargets } from "./links/checkAnchorTargets.js";
// check performance
import { checkViewportMeta } from "./performance/checkViewportMeta.js";
/* import { checkScriptBlocking } from "./performance/checkScriptBlocking.js";*/
import { checkPreload } from "./performance/checkPreload.js";
import { checkViewportMetaResponsive } from "./performance/checkViewportMetaResponsive.js";
// check semantics
import { checkSingleH1 } from "./semantics/checkSingleH1.js";
import { checkLangAttr } from "./semantics/checkLangAttr.js";
import { checkMainElement } from "./semantics/checkMainElement.js";
import { checkMetaCharset } from "./semantics/checkMetaCharset.js";
import { checkTitle } from "./semantics/checkTitle.js";
import { checkDuplicateTags } from "./semantics/checkDuplicateTags.js";
// check global
import { checkSiteFilesExist } from "./global/checkSiteFilesExist.js";
// check external
import { checkGoogleFontDisplaySwap } from "./external/checkGoogleFontDisplaySwap.js";
import { checkTrackingDuplicates } from "./external/checkTrackingDuplicates.js";
// export
export const htmlChecks = [
    checkSingleH1,
    checkLangAttr,
    checkMainElement,
    checkMetaCharset,
    checkTitle,
    checkMetaDescription,
    checkCanonical,
    checkOpenGraph,
    checkImageAlt,
    checkButtons,
    checkFormLabels,
    checkViewportMeta,
    /* checkScriptBlocking, */
    checkPreload,
    checkAnchorTargets,
    checkImageFormats,
    checkLazyLoading,
    checkMetaAuthorGenerator,
    checkMetaRobots,
    checkDuplicateTags,
    checkTouchTargets,
    checkIframesHaveTitle,
    checkGoogleFontDisplaySwap,
    checkTrackingDuplicates,
    checkViewportMetaResponsive,
];
export const globalChecks = [
    checkSiteFilesExist,
];
