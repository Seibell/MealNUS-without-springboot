/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.User;
import java.util.List;
import javax.ejb.Local;
import util.exception.InvalidLoginException;
import util.exception.UserAlreadyExistsException;
import util.exception.UserNotFoundException;

/**
 *
 * @author ryanl
 */
@Local
public interface UserSessionBeanLocal {

    public List<User> retrieveAllUsers();

    public void createUser(User user) throws UserAlreadyExistsException;

    public User userLogin(String email, String password) throws InvalidLoginException;

    public User retrieveUserByEmail(String email) throws UserNotFoundException;

    public User editUser(Long id, String firstName, String lastName, String email, String password, String imageURL);
    
}
