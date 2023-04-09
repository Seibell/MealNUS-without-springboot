package entity;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author kylie
 */
public class MyPair<MealBox, Integer> {
    private MealBox left;
    private Integer right;
    
     public MyPair() {
    }

    public MyPair(MealBox left, Integer right) {
        this.left = left;
        this.right = right;
    }

    public MealBox getLeft() {
        return left;
    }

    public void setLeft(MealBox left) {
        this.left = left;
    }

    public Integer getRight() {
        return right;
    }

    public void setRight(Integer right) {
        this.right = right;
    }
}

