/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.Category;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author 60540
 */
@Local
public interface CategorySessionBeanLocal {

    public Category createCategory(Category category);

    public Category retrieveCategoryById(Long categoryId);

    public Category retrieveCategoryByName(String categoryName);

    public List<Category> retrieveAllCategories();

    public Category updateCategory(Category category);

    public void deleteCategory(Long categoryId);
    
}
