/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.User;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.NonUniqueResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceException;
import javax.persistence.Query;
import util.exception.InvalidLoginException;
import util.exception.UserAlreadyExistsException;
import util.exception.UserNotFoundException;

/**
 *
 * @author ryanl
 */
@Stateless
public class UserSessionBean implements UserSessionBeanLocal {

    @PersistenceContext(unitName = "MealNUS-ejbPU")
    private EntityManager em;

    @Override
    public void createUser(User user) throws UserAlreadyExistsException {
        try {
            em.persist(user);
        } catch (PersistenceException ex) {
            throw new UserAlreadyExistsException("User email already exists");
        } catch (Exception ex) {
            throw new UserAlreadyExistsException("Something bad happened, should never reach here");
        }
    }

    @Override
    public List<User> retrieveAllUsers() {
        Query query = em.createQuery("SELECT u FROM User u");
        return query.getResultList();
    }

    @Override
    public User retrieveUserByEmail(String email) throws UserNotFoundException {
        Query query = em.createQuery("SELECT u FROM User u WHERE u.email = :inEmail");
        query.setParameter("inEmail", email);

        try {
            return (User) query.getSingleResult();
        } catch (NoResultException | NonUniqueResultException ex) {
            throw new UserNotFoundException("User not found!");
        }
    }

    @Override
    public User userLogin(String email, String password) throws InvalidLoginException {
        try {
            User user = retrieveUserByEmail(email);

            if (user.getPassword().equals(password)) {
                return user;
            } else {
                throw new InvalidLoginException("Email does not exist or invalid password!");
            }
        } catch (UserNotFoundException ex) {
            throw new InvalidLoginException("Email does not exist or invalid password!");
        }
    }

    @Override
    public User editUser(Long userId, String firstName, String lastName, String email, String password, String imageURL) {
        User user = em.find(User.class, userId);

        if (user != null) {
            user.setUserId(userId);
            user.setFirstName(firstName);
            user.setLastName(lastName);
            user.setEmail(email);
            user.setPassword(password);
            user.setImageURL(imageURL);
            em.merge(user);
        }
        return user;
    }
    
    @Override
    public User retrieveUserById(Long userId) throws UserNotFoundException {
        User user = em.find(User.class, userId);
        
        if (user != null) {
            return user;
        } else {
            throw new UserNotFoundException("User with user id: " + userId + " not found!");
        }
    }
}
