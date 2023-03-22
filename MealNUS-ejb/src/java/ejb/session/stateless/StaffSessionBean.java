/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.Staff;
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
public class StaffSessionBean implements StaffSessionBeanLocal {

    @PersistenceContext(unitName = "MealNUS-ejbPU")
    private EntityManager em;

    // Add business logic below. (Right-click in editor and choose
    // "Insert Code > Add Business Method")
    
    public void createStaff(Staff staff) {
        em.persist(staff);
    }
    
    @Override
    public List<Staff> retrieveAllStaff() {
        Query query = em.createQuery("SELECT s FROM Staff s");
        return query.getResultList();
    }

    @Override
    public Staff retrieveStaffByEmail(String email) throws UserNotFoundException {
        Query query = em.createQuery("SELECT s FROM Staff s WHERE s.email = :inEmail");
        query.setParameter("inEmail", email);

        try {
            return (Staff) query.getSingleResult();
        } catch (NoResultException | NonUniqueResultException ex) {
            throw new UserNotFoundException("Staff not found!");
        }
    }
    
    @Override
    public Staff staffLogin(String email, String password) throws InvalidLoginException {
        try {
            Staff staff = retrieveStaffByEmail(email);

            if (staff.getPassword().equals(password)) {
                return staff;
            } else {
                throw new InvalidLoginException("Email does not exist or invalid password!");
            }
        } catch (UserNotFoundException ex) {
            throw new InvalidLoginException("Email does not exist or invalid password!");
        }
    }
}
