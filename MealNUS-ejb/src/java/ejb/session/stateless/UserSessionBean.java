/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.User;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.NonUniqueResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import util.exception.InvalidLoginException;
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
    public void createUser(User user) {
        em.persist(user);
    }
    
    @Override
    public List<User> retrieveAllUsers() {
        Query query = em.createQuery("SELECT u FROM User u");
        return query.getResultList();
    }
    
    @Override
    public User retrieveUserByEmail(String email) throws UserNotFoundException {
        Query query = em.createQuery("SELECT u FROM User u WHERE u.email = :email");
        query.setParameter("inEmail", email);

        try {
            return (User) query.getSingleResult();
        } catch (NoResultException | NonUniqueResultException ex) {
            throw new UserNotFoundException("User not found!");
        }
    }

    @Override
    public User userLogin(String email, String password) throws InvalidLoginException
    {
        try
        {
            User user = retrieveUserByEmail(email);
            
            if (user.getPassword().equals(password))
            {
                return user;
            }
            else
            {
                throw new InvalidLoginException("Email does not exist or invalid password!");
            }
        }
        catch (UserNotFoundException ex)
        {
            throw new InvalidLoginException("Email does not exist or invalid password!");
        }
    }
    
    // Testing 123
    
}
