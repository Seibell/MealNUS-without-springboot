/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ws.model;

import entity.MealBox;
import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlElements;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author 60540
 */
@XmlRootElement

public class RetrieveAllMealBoxesResponse {

    private List<MealBox> mealBoxes;

    public RetrieveAllMealBoxesResponse() {
        mealBoxes = new ArrayList<>();
    }

    public RetrieveAllMealBoxesResponse(List<MealBox> mealBoxes) {
        this.mealBoxes = mealBoxes;
    }

    @XmlElements({
        @XmlElement(name = "mealbox", type = MealBox.class)
    })
    @XmlElementWrapper
    public List<MealBox> getMealBoxEntities() {
        return mealBoxes;
    }

    public void setMealBoxEntities(List<MealBox> mealBoxes) {
        this.mealBoxes = mealBoxes;
    }

}
