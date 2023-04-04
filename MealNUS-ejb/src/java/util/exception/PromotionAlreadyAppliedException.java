/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package util.exception;

/**
 *
 * @author Mehak
 */
public class PromotionAlreadyAppliedException extends Exception {

    /**
     * Creates a new instance of <code>PromotionAlreadyAppliedException</code>
     * without detail message.
     */
    public PromotionAlreadyAppliedException() {
    }

    /**
     * Constructs an instance of <code>PromotionAlreadyAppliedException</code>
     * with the specified detail message.
     *
     * @param msg the detail message.
     */
    public PromotionAlreadyAppliedException(String msg) {
        super(msg);
    }
}
