package ejb.session.stateless;

import entity.Category;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

@Stateless
public class CategorySessionBean implements CategorySessionBeanLocal {

    @PersistenceContext(unitName = "MealNUS-ejbPU")
    private EntityManager em;

    @Override
    public Category createCategory(Category category) {
        em.persist(category);
        return category;
    }

    @Override
    public Category retrieveCategoryById(Long categoryId) {
        return em.find(Category.class, categoryId);
    }
    
    @Override
    public Category retrieveCategoryByName(String categoryName) {
    Query query = em.createQuery("SELECT c FROM Category c WHERE c.name = :categoryName");
    query.setParameter("categoryName", categoryName);
    try {
        return (Category) query.getSingleResult();
    } catch (NoResultException ex) {
        return null;
    }
}

    @Override
    public List<Category> retrieveAllCategories() {
        Query query = em.createQuery("SELECT c FROM Category c");
        return query.getResultList();
    }

    @Override
    public Category updateCategory(Category category) {
        if (category != null && category.getCategoryId() != null) {
            return em.merge(category);
        } else {
            throw new IllegalArgumentException("Category or its ID is null.");
        }
    }

    @Override
    public void deleteCategory(Long categoryId) {
        Category category = retrieveCategoryById(categoryId);
        if (category != null) {
            em.remove(category);
        } else {
            throw new IllegalArgumentException("Category not found.");
        }
    }
}