/** ====================================================================================================================
 * @author Ayyoub El KOURI
 * @since 2004
 * 
 * 
 * @note Functions in this file are genereque, sow he can be reused, or make another implemnetation for hem
 * @warning If its to have somme classes, enhérite from him `extends`
 =====================================================================================================================*/

interface HelpersType {
    /**
     *  orientée consommatDocumentationeur
     */
    calcule: (args: number) => number;

    /**
     * Documentation orientée consommateur
     */
    helper: (args: number) => boolean;
}
export const Helpers: HelpersType = { calcule, helper };

/* ================================================= Implementation ================================================= */

// Have Some user to achive multiple connecions ?, we need you here from The last 
function calcule(args: number): number {
    return 1;
}

function helper(args: number): boolean {
    return true;
}
