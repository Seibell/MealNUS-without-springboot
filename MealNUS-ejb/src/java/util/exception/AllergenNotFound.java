/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package util.exception;

/**
 *
 * @author kylie
 */
public class AllergenNotFound extends Exception{

    /**
     * Creates a new instance of <code>AllergenNotFound</code> without detail
     * message.
     */
    public AllergenNotFound() {
    }

    /**
     * Constructs an instance of <code>AllergenNotFound</code> with the
     * specified detail message.
     *
     * @param msg the detail message.
     */
    public AllergenNotFound(String msg) {
        super(msg);
    }
}
