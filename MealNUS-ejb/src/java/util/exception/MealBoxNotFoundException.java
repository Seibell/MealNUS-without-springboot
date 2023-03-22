/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package util.exception;

/**
 *
 * @author ryanl
 */
public class MealBoxNotFoundException extends Exception {

    /**
     * Creates a new instance of <code>MealBoxNotFoundException</code> without
     * detail message.
     */
    public MealBoxNotFoundException() {
    }

    /**
     * Constructs an instance of <code>MealBoxNotFoundException</code> with the
     * specified detail message.
     *
     * @param msg the detail message.
     */
    public MealBoxNotFoundException(String msg) {
        super(msg);
    }
}
