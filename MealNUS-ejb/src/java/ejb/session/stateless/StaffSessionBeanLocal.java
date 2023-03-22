/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.Staff;
import java.util.List;
import javax.ejb.Local;
import util.exception.InvalidLoginException;
import util.exception.UserNotFoundException;

/**
 *
 * @author ryanl
 */
@Local
public interface StaffSessionBeanLocal {

    public Staff retrieveStaffByEmail(String email) throws UserNotFoundException;

    public List<Staff> retrieveAllStaff();

    public void createStaff(Staff staff);

    public Staff staffLogin(String email, String password) throws InvalidLoginException;
    
}
