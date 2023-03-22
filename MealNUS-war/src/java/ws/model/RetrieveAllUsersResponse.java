/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ws.model;

import entity.User;
import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlElements;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author ryanl
 */
@XmlRootElement

public class RetrieveAllUsersResponse
{
    private List<User> users;

    
    
    public RetrieveAllUsersResponse()
    {
        users = new ArrayList<>();
    }

    
    
    public RetrieveAllUsersResponse(List<User> users)
    {
        this.users = users;
    }
    
    

    @XmlElements({
        @XmlElement(name="user", type=User.class)
    })
    @XmlElementWrapper
    public List<User> getUserEntities() {
        return users;
    }

    public void setUserEntities(List<User> users) {
        this.users = users;
    }
}
